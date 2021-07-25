#!/bin/bash
echo "===============> Running GetData.js"
node GetData.js
echo "===============> Publishing latest data to GitHub"
git add src/Data/*
git commit -m "Latest data being published"
git push
echo "===============> Deploying - its going live!"
npm run deploy
yarn global add serve
serve -s build
