# Public API (NestJS)

## Description

A lightweight API that takes a number and returns interesting mathematical properties about it, along with a fun fact. Built with NestJS and TypeScript.

## :rocket: Setup Instructions

### Prerequisites

Node.js (v18+)
npm/yarn/pnpm

### Installation

Clone the repository:

```bash
git clone https://github.com/gbengaoo/number-class-api.git
cd your-repo
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run start
```

**Development mode** (with hot reload):

```bash
npm run start:dev
```

Access the API at:  
 `http://localhost:3000/api/classify-number?number=371`

## :books: API Documentation

### Endpoint

**GET** `/api/classify-number?number=371`

### Response Format (200 OK)

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11, // sum of its digits
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371" //gotten from the numbers API
}
```

### Response Format (400 Bad Request)

```json
{
  "number": "alphabet",
  "error": true
}
```

### Fields

`number`: A positive integer.
`is_prime`: A natural number greater than 1 that is not a product of two smaller natural numbers
`is_perfect`: A positive integer that is equal to the sum of its positive proper divisors, that is, divisors excluding the number itself
`properties`: An array, and the possible combinations for properties include `['armstrong', 'odd']`, `['armstrong', 'even']`, `['odd']`, `['even']`
`digit_sum`: sum of the digits of a number i.e. 128 -> 1 + 2 + 8 = 11.
`fun_fact`: fun fact about a number gotten from [numbers API](http://numbersapi.com/#42).

### Key Notes

CORS is enabled by default.
Response time optimized (< 500ms).

### Resources

- [Fun fact API](http://numbersapi.com/#42)
- https://en.wikipedia.org/wiki/Parity_(mathematics)
