from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse

from model.loader import load_model
from utils.image import preprocess_image
from model.predictor import predict

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup
model = load_model()

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    try:
        # Read image bytes from uploaded file
        image_bytes = await file.read()
        # Pass bytes to preprocess_image (you may need to update preprocess_image to accept bytes)
        image_tensor = preprocess_image(image_bytes)
        prediction_class, confidence_score = predict(model, image_tensor)
        return JSONResponse(content={
            "predicted_class": prediction_class,
            "confidence_score": round(confidence_score, 4)
        })
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# To run: uvicorn main:app --reload --host 0.0.0.0 --port 8000