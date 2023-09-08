This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Links

- car dealer https://codepen.io/developer4eto/pen/pQowZL?editors=1010


## Run Bitcoin
cd /Applications/Bitcoin-Qt.app/Contents/MacOS/
./bitcoin-qt -regtest --fallbackfee=0.00001

getnewaddress
generatetoaddress 200 bcrt1qg2vp5enhpek5pt7p4xr3v9m2vfmplhlfa2p69j

// To look for the vout number
gettransaction 1085070086073b995885a9868d7d1fb2e03514e3bce6d996287dac53e1f9bc93 false true

// broadcast
https://mempool.space/testnet/tx/push
