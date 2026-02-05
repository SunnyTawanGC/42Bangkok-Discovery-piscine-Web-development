#!/bin/bash

if [ $# -eq 0 ]; then
	echo "No arguments supplied"
fi
for arg in "$@"
do 
	mkdir "ex$arg"
done

