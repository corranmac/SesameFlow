FROM ubuntu:22.04

# Install Node.js 22 - https://github.com/nodesource/distributions?tab=readme-ov-file#installation-instructions-deb
# And python3
RUN apt update \
    && apt install -y curl python3 python3-pip \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt update \
    && apt install -y nodejs \
    && rm -rf /var/lib/apt/lists/* \
    && rm nodesource_setup.sh

RUN pip install --upgrade "huggingface_hub[cli]"

# Build the app
WORKDIR /tmp/app
COPY svelte-demo/ ./
RUN npm ci && npm rebuild && npm run build

# The site space name must be passed as an environment variable
# https://huggingface.co/docs/hub/spaces-sdks-docker#buildtime
ARG STATIC_SPACE
# The Hugging Face token must be passed as a secret (https://huggingface.co/docs/hub/spaces-sdks-docker#buildtime)
# 1. get README.md from the site space
RUN --mount=type=secret,id=HF_TOKEN,mode=0444,required=true \
    huggingface-cli download --token=$(cat /run/secrets/HF_TOKEN) --repo-type=space --local-dir=/tmp/app/dist $STATIC_SPACE README.md && rm -rf /tmp/app/dist/.cache
# 2. upload the new build to the site space, including README.md
RUN --mount=type=secret,id=HF_TOKEN,mode=0444,required=true \
    huggingface-cli upload --token=$(cat /run/secrets/HF_TOKEN) --repo-type=space $STATIC_SPACE /tmp/app/dist . --delete "*"

# Halt execution because the code space is not meant to run.
RUN exit 1