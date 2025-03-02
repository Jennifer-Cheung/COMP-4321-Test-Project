from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.root_router import router as root_router

app = FastAPI(
    title='COMP 4321 Mock Project',
    description='This is a test example showcasing how the database and server are connected.'
)

app.include_router(root_router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
