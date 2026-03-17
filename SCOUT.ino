#include <ESP8266WiFi.h>
#include <espnow.h>
#include <DHT.h>
 #include <user_interface.h> 

#define DHTPIN 4      // Physical Pin D2
#define DHTTYPE DHT22 
DHT dht(DHTPIN, DHTTYPE);

// Target Main Node MAC Address
uint8_t gatewayAddress[] = {0x30, 0x83, 0x98, 0xB5, 0xA3, 0x63}; 

typedef struct struct_message {
  int node_id; float temp; float hum; int mq135_analog; int mq7_tripwire;    
} struct_message;

struct_message myData;

void OnDataSent(uint8_t *mac_addr, uint8_t sendStatus) {
  Serial.print("Mesh Status: ");
  Serial.println(sendStatus == 0 ? "Delivery SUCCESS" : "Delivery FAIL");
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(5, INPUT); // MQ-7 on D1
  
  Serial.println("Scout Waking Up...");
  delay(2000); // Wait for DHT22 to stabilize

  WiFi.mode(WIFI_STA);
  WiFi.disconnect(); 
  wifi_set_channel(12); // Lock to Channel 12

  if (esp_now_init() != 0) return;

  esp_now_set_self_role(ESP_NOW_ROLE_CONTROLLER);
  esp_now_register_send_cb(OnDataSent);
  esp_now_add_peer(gatewayAddress, ESP_NOW_ROLE_SLAVE, 12, NULL, 0);
}

void loop() {
  myData.node_id = 1; 
  float t = dht.readTemperature();
  float h = dht.readHumidity();

  if (isnan(t) || isnan(h)) {
    Serial.println("DHT22 Error! Check D2 Wiring.");
    myData.temp = 0.0; myData.hum = 0.0;
  } else {
    myData.temp = t; myData.hum = h;
  }

  myData.mq135_analog = analogRead(A0); 
  myData.mq7_tripwire = digitalRead(5);  

  Serial.print("Firing Data: "); Serial.print(myData.temp); Serial.print("C | ");
  Serial.print(myData.hum); Serial.println("%");

  esp_now_send(gatewayAddress, (uint8_t *) &myData, sizeof(myData));
  delay(5000); 
}