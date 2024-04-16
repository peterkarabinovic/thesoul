## pgAdmin
docker run  --name pgadmin \
-d -p 8000:80 \
-e "PGADMIN_DEFAULT_EMAIL=admin@admin.com" \
-e "PGADMIN_DEFAULT_PASSWORD=root"  \
--network=host \
dpage/pgadmin4:latest