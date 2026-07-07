# TODO - Fix GitHub build failure

- [ ] Analyze failing file(s) for TypeScript error.
- [ ] Replace/adjust `src/pages/api/send-commission.ts` to avoid requiring `nodemailer` at build time.
- [ ] Ensure API still works by using the existing `WEBHOOK_URL` / `RESEND_API_KEY` approach.
- [ ] Re-run `npm run build:export` locally to verify TypeScript passes.

