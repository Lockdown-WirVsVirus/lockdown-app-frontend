rm -rf src/gen-backend-api && \
    openapi-generator generate -i http://localhost:3000/api-doc-json --generator-name typescript-axios -o src/gen-backend-api --config api.json && \
    cd src/gen-backend-api && \
    npm install && \
    rm -rf .openapi-generator .openapi-generator-ignore .gitignore git_push.sh index.ts