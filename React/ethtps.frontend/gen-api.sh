#cd ethtps.frontend
curl -o api-def.json http://localhost:10202/swagger/v1/swagger.json
openapi-generator-cli generate -g javascript -i api-def.json -o src/services/api
mv src/services/api/src/ src/services/api-gen
rm -r src/services/api/