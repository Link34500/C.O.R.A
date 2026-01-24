#!/bin/sh


echo "Base de données prête !"

pnpm exec prisma generate

if [ "$NODE_ENV" = "production" ]; then
    pnpm exec prisma migrate deploy
else
    pnpm exec prisma db push
fi

exec "$@"