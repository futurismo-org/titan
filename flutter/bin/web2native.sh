#!/bin/bash
cp -r web/lib native
find native -name "*.dart" -type f | xargs sed -i "s/flutter_web/flutter/g"  
