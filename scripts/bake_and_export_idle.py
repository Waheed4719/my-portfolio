"""
Bake a Mixamo idle action per-frame and export a clean GLB for Three.js.

WHY: Mixamo legs are FK. The planted foot only stays put because the hip
sway and leg rotations cancel exactly. Blender stores those curves as Bezier;
glTF resamples them differently, so the foot skates in Three.js. Baking one
key per frame (visual keying) freezes exactly what Blender shows, so playback
matches. Do NOT flatten the Hips location channels - that breaks the cancel
and makes feet slide in Blender too.

HOW TO USE:
  1. Open your .blend with the Mixamo character + idle action.
  2. Go to the "Scripting" workspace tab (top of Blender).
  3. Click "New" in the text editor, paste this whole file in.
  4. Check EXPORT_PATH below (defaults to this portfolio's public/models).
  5. Press the "Run Script" (play) button.

It operates on the currently selected armature (or the only armature in
the scene). The original action is left intact; a baked copy is created
and exported.
"""

import bpy

# ---- EDIT THIS ----------------------------------------------------
# Lands the baked GLB straight into the portfolio's models folder.
EXPORT_PATH = "/Users/red4719/my-portfolio/public/models/idle_baked.glb"
# Or keep it next to the .blend instead:
# EXPORT_PATH = bpy.path.abspath("//idle_baked.glb")
# -------------------------------------------------------------------


def find_armature():
    obj = bpy.context.active_object
    if obj and obj.type == 'ARMATURE':
        return obj
    arms = [o for o in bpy.context.scene.objects if o.type == 'ARMATURE']
    if len(arms) == 1:
        return arms[0]
    if not arms:
        raise RuntimeError("No armature found in the scene.")
    raise RuntimeError("Multiple armatures - select the one you want, then re-run.")


def main():
    arm = find_armature()
    print("Armature:", arm.name)

    # Make it the active/selected object in Object Mode.
    bpy.ops.object.mode_set(mode='OBJECT')
    bpy.ops.object.select_all(action='DESELECT')
    arm.select_set(True)
    bpy.context.view_layer.objects.active = arm

    # Apply rotation + scale so Three.js doesn't fight the Mixamo 0.01 scale.
    # (Location left alone so we don't move the rig in the scene.)
    try:
        bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
        print("Applied rotation + scale.")
    except RuntimeError as e:
        print("Could not apply transforms (ok if already applied):", e)

    # Frame range from the active action if present, else scene range.
    if arm.animation_data and arm.animation_data.action:
        act = arm.animation_data.action
        f_start, f_end = (int(act.frame_range[0]), int(act.frame_range[1]))
        print("Action:", act.name, "range", f_start, "-", f_end)
    else:
        f_start, f_end = (bpy.context.scene.frame_start,
                          bpy.context.scene.frame_end)
        print("No action; using scene range", f_start, "-", f_end)

    # Enter Pose Mode and select ALL bones so every bone gets baked.
    bpy.ops.object.mode_set(mode='POSE')
    bpy.ops.pose.select_all(action='SELECT')

    # Bake: one key per frame, visual keying captures the exact viewport pose.
    bpy.ops.nla.bake(
        frame_start=f_start,
        frame_end=f_end,
        step=1,
        only_selected=True,
        visual_keying=True,
        clear_constraints=True,
        clear_parents=False,
        use_current_action=False,   # create a new baked action
        bake_types={'POSE'},
    )
    baked = arm.animation_data.action
    baked.name = "idle_baked"
    # Diagnostic key count - works on both legacy and 4.4+ layered actions.
    n_keys = 0
    fcurves = getattr(baked, "fcurves", None)
    if fcurves and len(fcurves):
        n_keys = len(fcurves[0].keyframe_points)
    else:
        for layer in getattr(baked, "layers", []):
            for strip in layer.strips:
                for cb in getattr(strip, "channelbags", []):
                    if cb.fcurves:
                        n_keys = len(cb.fcurves[0].keyframe_points)
                        break
    print("Baked action:", baked.name, "keys per channel ~", n_keys)

    bpy.ops.object.mode_set(mode='OBJECT')

    # Export GLB. force_sampling keeps one key per frame in the file.
    bpy.ops.export_scene.gltf(
        filepath=EXPORT_PATH,
        export_format='GLB',
        use_selection=True,
        export_animations=True,
        export_force_sampling=True,
        export_frame_range=True,
        export_apply=True,          # apply modifiers
        export_yup=True,            # Three.js is Y-up
    )
    print("Exported:", EXPORT_PATH)
    print("DONE. Load this GLB in Three.js - the planted foot should stay put.")


main()
