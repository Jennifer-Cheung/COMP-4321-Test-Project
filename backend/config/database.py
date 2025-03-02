from pymongo import MongoClient

client = MongoClient("mongodb+srv://jennifer2345:jennipassword@cluster0.1sxxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client.website_db
website_collection = db['website_collection']
