#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# Manual deploy script — run this from your local machine if you don't want
# to set up Cloud Build triggers.
#
# Prerequisites:
#   1. gcloud CLI installed and authenticated  (gcloud auth login)
#   2. Docker installed and running
#   3. Set PROJECT_ID below OR export it:  export PROJECT_ID=my-gcp-project
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

# ── Config — edit these ───────────────────────────────────────────────────────
PROJECT_ID="${PROJECT_ID:-YOUR_GCP_PROJECT_ID}"
SERVICE_NAME="election-guide"
REGION="asia-south1"   # Mumbai
IMAGE="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

# ─────────────────────────────────────────────────────────────────────────────
echo "🔨  Building Docker image..."
docker build -t "${IMAGE}:latest" .

echo "🔑  Configuring Docker to push to GCR..."
gcloud auth configure-docker --quiet

echo "📤  Pushing image to Container Registry..."
docker push "${IMAGE}:latest"

echo "🚀  Deploying to Cloud Run (region: ${REGION})..."
gcloud run deploy "${SERVICE_NAME}" \
  --image="${IMAGE}:latest" \
  --region="${REGION}" \
  --platform=managed \
  --allow-unauthenticated \
  --port=8080 \
  --min-instances=0 \
  --max-instances=10 \
  --memory=256Mi \
  --cpu=1 \
  --project="${PROJECT_ID}" \
  --quiet

echo ""
echo "✅  Deployment complete!"
echo "🌐  Your app URL:"
gcloud run services describe "${SERVICE_NAME}" \
  --region="${REGION}" \
  --project="${PROJECT_ID}" \
  --format="value(status.url)"
