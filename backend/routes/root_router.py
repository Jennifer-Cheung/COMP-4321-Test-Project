from fastapi import APIRouter, status, HTTPException, Body
from models.websites import Website
from config.database import website_collection
from schema.schemas import list_serial, individual_serialize
from bson import ObjectId

router = APIRouter(
    tags=['Root']
)

@router.get(
    '/',
    response_description='List all websites',
    response_model=list[Website]
)
async def list_websites(query: str = ''):
    websites = list_serial(website_collection.find())
    if query == '':
        return websites
    else:
        results = []
        for website in websites:
            if query in website['title'] or query in website['url'] or query in website['content']:
                results.append(website)
        return results

@router.post(
    '/',
    response_description='Create a website entry',
    response_model=Website,
    status_code=status.HTTP_201_CREATED
)
async def create_website(requestWebsite: Website = Body(...)):
    website = dict(requestWebsite)
    if website['title'] is not None and website['url'] is not None and website['content'] is not None:
        website_collection.insert_one(website)
        return website

@router.put(
    '/{id}',
    response_description='Update a website entry',
    response_model=Website
)
async def update_website(id: str, requestWebsite: Website = Body(...)):
    website = dict(requestWebsite)

    # The ID provided does not point to an existing entry
    if (existing_website := website_collection.find_one({"_id": ObjectId(id)})) is None:
        raise HTTPException(status_code=404, detail=f"Website ID of {id} not found")

    if website['title'] is None and website['url'] is None and website['content'] is None:
        # No update is required because no content is provided
        return individual_serialize(existing_website)
    else:
        website_collection.find_one_and_update({'_id': ObjectId(id)}, {'$set': website})
        return individual_serialize(website_collection.find_one({"_id": ObjectId(id)}))
    
@router.delete(
    '/{id}',
    response_description='Delete a website entry',
    response_model=Website
)
async def delete_website(id: str):
    if (existing_website := website_collection.find_one({"_id": ObjectId(id)})) is None:
        raise HTTPException(status_code=404, detail=f"Website ID of {id} not found")
    else:
        website_collection.find_one_and_delete({"_id": ObjectId(id)})
        return existing_website
