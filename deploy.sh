#!/bin/bash

git pull
pnpm vite build
sudo docker compose up -d --build
