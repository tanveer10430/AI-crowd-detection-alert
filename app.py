from flask import Flask, request, jsonify, render_template
import threading
import main

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/upload-video", methods=["POST"])
def upload_video():

    video = request.files["video"]

    video_path = "uploaded_video.mp4"

    video.save(video_path)

    print("Video received!")

    threading.Thread(
        target=main.detect_people,
        args=(video_path,),
        daemon=True
    ).start()

    return jsonify({
        "message": "Video processing started"
    })


@app.route("/api/person-count")
def get_person_count():

    return jsonify({
        "people": main.person_count
    })
if __name__ == "__main__":
    app.run(debug=False)