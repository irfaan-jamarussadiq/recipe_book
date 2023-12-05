#!/bin/bash

image=$1
convert "$image" -resize '400' "${image%.*}--small.${image##*.}"
convert "$image" -resize '800' "${image%.*}--medium.${image##*.}"
convert "$image" -resize '1200' "${image%.*}--large.${image##*.}"
rm $image