# 🧠 TruthChain — AI + Web3 Fake News Defense Network

> Building the trust layer of the internet using Artificial Intelligence, Blockchain, and Decentralized Verification.

---

## 🚀 Overview

AI has changed the way digital content is created.

But with powerful AI tools, the internet is facing a new crisis:

**Can we still trust what we see online?**

Deepfake videos, AI-generated images, manipulated screenshots, and fake regional news can spread worldwide within minutes.

**TruthChain** solves this by creating a decentralized verification protocol where every piece of digital content receives:

- 🤖 AI authenticity analysis
- 🇮🇳 Regional misinformation detection
- 📊 Trust Score
- ⛓ Blockchain Content Passport

---

# 🎯 Problem Statement

The rise of generative AI has created a misinformation crisis.

Current problems:

- AI-generated deepfake videos
- Fake political speeches
- Edited screenshots
- Fake WhatsApp forwards
- No ownership proof for original content
- Lack of verification for regional languages

Society needs a transparent trust infrastructure.

---

# 💡 Solution

TruthChain allows users to upload:

- 📷 Images
- 🎥 Videos
- 📝 Text / News / Messages

The platform analyzes content and answers:

> "Can this content be trusted?"

---

# ⚙️ How It Works

```text
User Uploads Content
          |
          ↓
AI Verification Engine
          |
          ↓
Deepfake Detection
          |
          ↓
Sarvam AI Fact Checker
          |
          ↓
Trust Score Calculation
          |
          ↓
IPFS Storage
          |
          ↓
Blockchain Content Passport
```

---

# ✨ Features

## 🔍 AI Deepfake Detection

Detects:

- Face swaps
- AI generated faces
- Synthetic videos
- Manipulated images


Example Result:

```json
{
 "deepfake_probability":"87%",
 "manipulation":"Face Replacement Detected",
 "risk":"High"
}
```

---

# 🇮🇳 Sarvam AI Regional Verification

Most misinformation spreads in regional languages.

TruthChain uses **Sarvam AI** to understand Indian languages.

Example:

Input:

```text
सरकार उद्या बँका बंद करणार आहे
```

AI Pipeline:

```
Language Detection

↓

Translation

↓

Claim Extraction

↓

Fact Verification
```


Output:

```json
{
"language":"Marathi",
"claim":"Banks will remain closed tomorrow",
"result":"False",
"confidence":"92%"
}
```

---

# ⛓ Web3 Content Passport

TruthChain creates a permanent authenticity record.

Every verified content receives:

```text
Content Passport

ID:
0x72828


Creator:
Verified Wallet


Created:
June 2026


AI Modified:
No


Trust Score:
96/100
```

---

# 🏗 System Architecture

```text

                    USER
                     |
                     |
        TruthChain Frontend
        (Base44 + Next.js)
                     |
                     |
              FastAPI Backend
                     |
 ------------------------------------------------
 |                    |                         |
AI Engine        Sarvam AI Engine        Web3 Engine

Deepfake          Fact Checking          Blockchain
Detection              |                       |
                       |                      IPFS
                 Trust Score

```

---

# 🛠 Tech Stack

## Frontend

- Base44
- Next.js
- React.js
- TypeScript
- Tailwind CSS
- ShadCN UI


---

## Backend

- Python
- FastAPI
- REST APIs


---

## Artificial Intelligence

- Sarvam AI
- HuggingFace Models
- PyTorch
- OpenCV
- Computer Vision


---

## Blockchain

- Solidity
- Base Blockchain
- Smart Contracts
- Ethers.js
- Wallet Connect


---

## Storage

- IPFS
- Pinata


---

## Database

- Supabase PostgreSQL


---

# 🤖 AI Verification Pipeline


## Image / Video Analysis


```text
Media Upload

↓

Frame Extraction

↓

Face Detection

↓

Deepfake Model

↓

Manipulation Score

```

Models:

- EfficientNet
- MesoNet
- XceptionNet


---

# 📊 Trust Score Algorithm


Initial Score:

```
100 Points
```


Reduction:

| Detection | Penalty |
|-|-|
| Deepfake detected | -40 |
| Unknown source | -20 |
| Metadata mismatch | -15 |
| False information | -25 |


Example:

```text
Final Trust Score:

23/100

⚠ Highly Suspicious
```

---

# 🔐 Blockchain Architecture


Instead of storing files on blockchain:

❌ Wrong:

```text
Video → Blockchain
```


✅ Correct:

```text
Content

↓

SHA256 Hash

↓

IPFS Storage

↓

Blockchain Proof
```


---

# 📜 Smart Contract

Content Passport Contract:

Stores:

```solidity
struct Passport {

 string contentHash;

 address creator;

 uint256 timestamp;

 uint trustScore;

 bool aiGenerated;

}
```


Functions:

```solidity
registerContent()

verifyContent()

getPassport()
```

---

# 🔥 Demo Flow


## Step 1

Upload suspicious politician video


---

## Step 2

TruthChain scans:

```text
Analyzing frames...

Checking manipulation...

Finding original source...
```


---

## Step 3

AI Result:


```text
⚠ WARNING

Deepfake Detected

Confidence:
91%

Trust Score:
18/100

```

---

## Step 4


Blockchain Verification:


```text
Content Passport Created

Verified on Blockchain ✔

Hash:

0x82728292

```

---

# 🌎 Future Scope


## Browser Extension

Real-time verification on:

- Twitter / X
- Instagram
- News Websites
- WhatsApp Web


---

## TruthChain API


Organizations can integrate:

```http
POST /verify-content
```


Response:


```json
{
 "verified":true,
 "trust_score":96
}
```

---

# 🎯 Target Users

- Journalists
- Social Media Platforms
- Governments
- Fact Checkers
- General Public


---

# 🚀 Vision

Today HTTPS protects websites.

Tomorrow TruthChain protects information.

**Creating the decentralized trust infrastructure layer for the AI era.**

---

# 🏆 Built For

HackHazards 2026

Using:

🧠 Artificial Intelligence  
🇮🇳 Sarvam AI  
⚡ Base44  
⛓ Blockchain  
🌐 Web3  

---

# ⭐ Support

If you believe the internet deserves truth...

Give TruthChain a ⭐
