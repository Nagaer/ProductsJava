Инструкция по запуску приложения:
1. Запустить базу данных HSQLDB, перейдя в консоли в папку hsqldb и введя "java -classpath lib/hsqldb.jar org.hsqldb.server.Server —database.0 file.product_database —dbname.0 product_database"
2. Запустить само приложение и обратиться к нему по адресу localhost:8081
3. При необходимости настроить серверный порт в классе ProductsJavaApplication в зависимости от особенностей того сервера, на который загружается приложение
