
# Procena/Nekretnine

This is an app for appraising the value of your property in Belgrade.

[real-estate-appraisal](https://real-estate-appraisal.vercel.app/en)

The user will be able to appraise their property, sign up for data persistance, as well as see the market of other properties. The api folder communicates with a MongoDB cluster and stores the users, and the properties.

It is built with Next.js, and uses Next-Auth for authentication. React-Query is used for api-call management. The appraising is done with the Brain.js library. The data was scrapped with Python. TailwindCSS is used for UI.

## Installation

```bash
npm install
```

## Notes

The algorithm is trained on apartments in Belgrade, Serbia. The appraisal of properties outside Belgrade decreases in accuracy.

Signing up / signing in with Google. Logging in with credentials is still being worked on.


