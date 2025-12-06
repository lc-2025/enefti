#!/bin/bash

# Opened Query Alerts (tool=CodeQL, state=open)
ALERTS=$(gh api /repos/$1/code-scanning/alerts --jq '.alerts[] | select(.tool.name=="CodeQL") | @base64')

echo "alerts_count=$(echo $ALERTS | jq length)" >> $GITHUB_OUTPUT
echo "alerts_data<<EOF" >> $GITHUB_OUTPUT
echo $ALERTS >> $GITHUB_OUTPUT
echo EOF >> $GITHUB_OUTPUT
