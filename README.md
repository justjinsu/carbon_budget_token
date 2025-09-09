
# CarbonBudgetToken (CBT)

**Concept**: Token supply mirrors the remaining 1.5°C global carbon budget. **Emissions = token burn**.  
This repo includes a minimal ERC-20 (burnable), a Hardhat setup, and placeholders for oracle specs and data pipeline.

## Quick start

```bash
# 1) Install
npm i

# 2) Compile
npx hardhat compile

# 3) Test (sample)
npm test

# 4) Deploy to Sepolia (testnet)
# set env vars first (see .env.example)
npx hardhat run scripts/deploy.ts --network sepolia
```

## Networks
Configured for **Sepolia** (test), **Base** (mainnet), and **Base Sepolia** (test). Edit `hardhat.config.ts` as needed.

## Data / Policy
- `data/ledger/` : CSV snapshots of reference budget & emissions (include URL & hash in comments/header).
- `data/policy/` : governance rules, chosen reference series (IGCC or GCB), and reconciliation policy.
- `oracle_specs/` : Chainlink Functions or UMA assertion specs.

## Security
- UUPS upgradeable pattern gated by a Safe multisig (recommended).
- See `SECURITY.md` and `docs/` for deployment checklist.


---

## Governance & Transparency (Recommended Defaults)

- **Visibility plan**: start **Private**, switch to **Public** after the first testnet deployment and docs review.
- **Branch protection**: require PR + 1 approval + CI pass on `main`.
- **Secrets**: use GitHub Actions Secrets; never commit `.env`.
- **Governance**: Snapshot (off-chain voting) + Safe multisig (on-chain execution) + 2-day timelock for upgrades and supply adjustments.
- **Licensing**: Apache-2.0 for code; CC BY 4.0 for docs/data you author (see `docs/LICENSES.md`).
