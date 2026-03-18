#include <ESP8266WiFi.h>
#include <espnow.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const char* ssid = "The Worst Thing Ever "; 
const char* password = "rxl123456";
String blynkToken = "GGl_zg4hshNZ2bWxQbkAUH2_QFz5oqSh";

typedef struct struct_message {
  int node_id; float temp; float hum; int mq135_analog; int mq7_tripwire;    
} struct_message;

struct_message myData;

void OnDataRecv(uint8_t * mac, uint8_t *incomingData, uint8_t len) {
  memcpy(&myData, incomingData, sizeof(myData));
  
  // PRINT TO TERMINAL IMMEDIATELY
  Serial.println("\n--- DATA RECEIVED FROM SCOUT ---");
  Serial.print("Temp: "); Serial.print(myData.temp); Serial.println(" C");
  Serial.print("Hum:  "); Serial.print(myData.hum); Serial.println(" %");
  Serial.print("MQ135: "); Serial.println(myData.mq135_analog);

  // UPLINK TO BLYNK
  if(WiFi.status() == WL_CONNECTED){
    WiFiClient client;
    HTTPClient http;
    String url = "http://blynk.cloud/external/api/update?token=" + blynkToken +
                 "&V1=" + String(myData.temp) + "&V2=" + String(myData.hum) +
                 "&V3=" + String(myData.mq135_analog) + "&V4=" + String(myData.mq7_tripwire);
    
    http.begin(client, url);
    int httpCode = http.GET();
    Serial.println(httpCode == 200 ? "Blynk: SUCCESS" : "Blynk: FAIL");
    http.end();
  } else {
    Serial.println("Blynk: Waiting for WiFi...");
  }
}

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);

  // 1. START LISTENING IMMEDIATELY
  if (esp_now_init() == 0) {
    esp_now_set_self_role(ESP_NOW_ROLE_SLAVE);
    esp_now_register_recv_cb(OnDataRecv);
    Serial.println("Mesh Ears: ACTIVE. Listening on Channel 12...");
  }

  // 2. CONNECT TO WIFI IN BACKGROUND
  WiFi.begin(ssid, password);
  Serial.println("Attempting WiFi Connection...");
}

void loop() {
  // Passively listening in the background
}