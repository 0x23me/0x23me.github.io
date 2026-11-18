#!/bin/sh
# Serves the org page with the project pages under it, the way GitHub Pages does:
# sh serve.sh [port], with ~/code/priel and ~/code/pbs-mackup (or PRIEL=, MACKUP=) next to it.
set -eu
here=$(cd "$(dirname "$0")" && pwd)
root=$(mktemp -d)
trap 'rm -rf "$root"' EXIT
ln -s "$here/index.html" "$root/index.html"
ln -s "$here/kit" "$root/kit"
ln -s "$here/ppe-pve-t2" "$root/ppe-pve-t2"
ln -s "${PRIEL:-$HOME/code/priel}/site" "$root/priel"
ln -s "${MACKUP:-$HOME/code/pbs-mackup}/site" "$root/pbs-mackup"
cd "$root" && python3 -m http.server "${1:-8023}" --bind 127.0.0.1
