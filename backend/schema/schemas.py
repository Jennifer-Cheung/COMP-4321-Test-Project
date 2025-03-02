def individual_serialize(website) -> dict:
    return {
        'id': str(website['_id']),
        'title': website['title'],
        'url': website['url'],
        'content': website['content'],
    }

def list_serial(websites) -> list:
    return [individual_serialize(website) for website in websites]
