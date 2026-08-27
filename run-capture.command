#!/bin/bash
cd "$(dirname "$0")"
npm run capture:showcase
read -r -p "Press Enter to close..."
