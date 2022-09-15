#!/bin/zsh

chmod 755 coursesearch

touch ~/.zshrc
echo "export PATH=$PATH:$(pwd)" >> ~/.zshrc
exec zsh