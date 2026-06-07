export const textVariant = (delay?: number) => ({
    hidden: {
        y: -50,
        opacity: 0
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 1.25,
            delay
        }
    }
});

export const fadeIn = (direction: string, type: number, delay: number, duration: number) => ({
    hidden: {
        x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
        y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
        opacity: 0
    },
    show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            type,
            delay,
            duration,
            ease: 'easeOut'
        }
    }
});

export const zoomIn = (delay: number, duration: number) => ({
    hidden: {
        scale: 0,
        opacity: 0
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'tween',
            delay,
            duration,
            ease: 'easeOut'
        }
    }
});

export const slideIn = (direction: string, type: number, delay: number, duration: number) => ({
    hidden: {
        x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
        y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0
    },
    show: {
        x: 0,
        y: 0,
        transition: {
            type,
            delay,
            duration,
            ease: 'easeOut'
        }
    }
});
export const staggerContainer = (staggerChildren?: number, delayChildren?: number) => ({
    hidden: {},
    show: {
        transition: {
            staggerChildren,
            delayChildren: delayChildren || 0
        }
    }
});

export const drawerVariant = {
    hidden: {
        x: '100%',
        transition: {
            duration: 0.5
        }
    },
    visible: {
        x: 0,
        transition: {
            duration: 0.5
        }
    }
};

export const listVariants = {
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            delayChildren: 0.5,
            staggerChildren: 0.5
        }
    },
    hidden: {
        opacity: 0
    }
};

export const listItemVariants = {
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1
        }
    },
    hidden: {
        opacity: 0,
        x: 40
    }
};
