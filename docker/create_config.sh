#!/bin/sh -eu

if [ -z "${BACKEND_URL:-}"]; then
  BACKEND_URL=undefined
else
  BACKEND_URL=$BACKEND_URL
fi

cat <<<EOF
window.BACKEND_URL='${BACKEND_URL}';
EOF
