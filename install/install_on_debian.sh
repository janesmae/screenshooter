#!/usr/bin/env bash

set -eu
umask 022

if [[ $UID -ne 0 ]]; then
	echo "This script must be run as root" 1>&2
	exit 1
fi

# Install essetials including nodejs and libraries
apt-get update
apt-get install -y build-essential git curl vim
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt-get install -y nodejs libfontconfig

# Create user
useradd -s /bin/bash -m -d /home/screenshooter -c screenshooter screenshooter


