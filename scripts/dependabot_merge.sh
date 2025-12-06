#!/bin/bash

gh pr review "$1" --approve
gh pr merge "$1" --auto --squash --delete-branch
