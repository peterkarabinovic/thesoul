docker compose down store
rm -rf the-store/node_modules/medusa-auth-otp/
pnpm recursive run --filter 'packages/*' build && pnpm --dir the-store install
aws-vault exec --no-session personal -- docker compose up store