from ultralytics import YOLO
import cv2

model = YOLO("yolo11n.pt")
person_count=0

def detect_people(videoo):
    print("chaloooooooooooooooooooooooooooooooo")
    global person_count
    cap = cv2.VideoCapture(videoo)
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        results = model(frame, verbose=False)
        person_count = 0
 
        for result in results:
            for box in result.boxes:

                class_id = int(box.cls[0])

       
                if class_id == 0:
                    person_count += 1
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    cv2.rectangle(
                        frame,
                        (x1, y1),
                        (x2, y2),
                        (0, 255, 0),
                        2
                    )
        print("People:", person_count)
   
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()
    




