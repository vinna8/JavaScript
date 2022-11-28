Чтобы запустить сервер и клиент одновременно:  
### `npm run dev`

Приложение позволяет: 
- Получить список файлов выбранной папки
- Скачать файл
- Удалить файл
- Создать новый каталог
- Удалить пустой каталог
- Посмотреть файл


# Описание API

## Получить список файлов папки
	GET-запрос: http://localhost:3001/api/directory?path=${path}
	url: /api/directory
	params:
	  path - путь до директории
	output
	{
		data: 
			files:[{file and directorys}]
			currDir: ''
			prevDir: ''
		status: 200
	}

## Скачать файл
	GET-запрос: http://localhost:3001/api/file/download?path=${path}
	url: /api/file/download
	params:
	  path - путь до файла

## Удалить файл
	GET-запрос: http://localhost:3001/api/file/delete?path=${path}
	url: /api/file/delete
	params:
	  path - путь до файла

## Создать новый каталог
	GET-запрос: http://localhost:3001/api/directory/create?path=${path}
	url: /api/directory/create
	params:
	  path - путь до каталога

## Удалить пустой каталог
	GET-запрос: http://localhost:3001/api/directory/delete?path=${path}
	url: /api/directory/delete
	params:
	  path - путь до каталога

## Посмотреть файл
	http://localhost:3001/path=${path}
	path - путь до файла
