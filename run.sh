docker compose down store
rm -rf the-store/node_modules/commons/
rm -rf the-store/node_modules/medusa-auth-otp/
rm -rf the-store/node_modules/medusa-novaposhta-fulfillment/
pnpm --filter './packages/*' build && pnpm --dir the-store install
aws-vault exec --no-session personal -- docker compose up store