FROM mcr.microsoft.com/devcontainers/base:ubuntu

ARG DEBIAN_FRONTEND=noninteractive
ENV NVM_DIR=/home/vscode/.nvm

# Basic packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    curl wget git zsh ripgrep bat fzf eza \
    apt-transport-https ca-certificates gnupg lsb-release unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Docker CLI + Compose plugin (Docker official repo)
RUN mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
    && echo \
    "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
    > /etc/apt/sources.list.d/docker.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends docker-ce-cli docker-compose-plugin \
    && rm -rf /var/lib/apt/lists/*

# kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
    && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl \
    && rm -f kubectl

# Helm
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# zoxide and starship
RUN curl -sS https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | bash \
    && curl -fsSL https://starship.rs/install.sh | bash -s -- -y

# Configure zsh, starship and aliases for vscode user
RUN mkdir -p /home/vscode/.config \
    && echo 'eval "$(starship init zsh)"' >> /home/vscode/.zshrc \
    && echo 'eval "$(zoxide init zsh)"' >> /home/vscode/.zshrc \
    && echo 'alias cat="batcat"' >> /home/vscode/.zshrc \
    && echo 'alias ls="eza -al --icons"' >> /home/vscode/.zshrc \
    && echo 'alias k=kubectl' >> /home/vscode/.zshrc \
    && echo "export NVM_DIR=\"$NVM_DIR\"" >> /home/vscode/.zshrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' >> /home/vscode/.zshrc \
    && chsh -s /usr/bin/zsh vscode \
    && chown -R vscode:vscode /home/vscode

# Install NVM and Node LTS as vscode user
USER vscode
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash \
    && . "$NVM_DIR/nvm.sh" \
    && nvm install --lts

# Use zsh as shell for subsequent RUNs
SHELL ["/bin/zsh", "-c"]
