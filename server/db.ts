import * as admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "desafio-m6-apx",
  private_key_id: "44f38920f4165ba6db921a50c2e569f2dcc3f0d7",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDNxfjuegKBniJO\nfg4Y40up+CBJOoDj18vfGFsAz/c01ChNKjC705QM/a0Xsb8imB5Ur+iaOWVrr13M\n40QnyBcfNd51+StIS7O1SmctfEA9StrrZQIueqgLiDC7DjOIVNYkb7E0aStN39TW\ns2/VMnzBMKC61RoroS/lh97kzXx9eRIc2+7NHMnmBXrhpazSrY2sUgwHDUS2MgoA\n2nc9a/uPd8txzfshm/DXQqhDjiwhXSOokqiUIw3TZFRiHmrbBEfGTqbz+VS9YZT3\nKb50A6MRlLeKF2OgT2RFrGYwl4H/AIr2FIOpWFqnQEYpchd92nirl7d/Nc/4BZ4T\nT1pf20tdAgMBAAECggEANkJKpo9zk7wf7bSdgQCGVhZAZS7RB8NCVdx1Opyb4clD\nqz1BxnU+58IIX2QWM0gLT2dnHSufS6rdQAZ5VUgUmL06oL8II7MaeuZYmIzX35Ga\nclGbJqhfIVNTDi/rdLpyEP+GqXxF1+36kHaWOZBrhwGMkFda5EBHge2233wzpF3M\nJ0YFIUX86ZWYlA5ATBLIj5CFJNFOWPh2R0FOSF2FCSwZ2hOYmbvFYsJYmlZL1dLj\nq4nstG3zXqd/HnniKmcH/wl6eipX2tI9+N8zb+saY11ytLKzpPulLE9nR9w7tgdG\nd8Hy64G1wjNCE7Iu0pkI0YC3llZSVC1WtVxQVFLe3QKBgQDyqJ8P9K9xW4sTxHKl\nuW1GxISu83x05Ja6TlSkUbVGVeYUfanjJ+/jGjhypLtwnxELUrqg9B9/6HcehaON\n2USs0bFXFr4iDV25313yZ1hyQXB2RfdaA2hLuSq5c6cwpXoe7V58pWlUDivYRfDF\naVNqh9tB2zC9CD0m1vFdH1v++wKBgQDZFjI6ZC4lkotRYxviEuFAOB9NzFkrCf3O\nPgv4nMIb1La4NdHG+4Sw82VxeTZHmlCTjS4UmMou0WOqiVB4l/WFroIAkgI1WgTD\nNg71f0a7kYaDzuk8U2Q97NVKcYr7Wc6HbK8sXpIq/0fythi2KqHRYS0xQjgsGSI9\nc3W9mgtvhwKBgAUL8rrvONLft4XCuSuvLpGhNq04zSbVNjlLtcDxHhcHZFCayHS7\n+OY9Pl1MBcXy2PTmVJFSYnFTkV6mIt+pXB9IASsxguTMaF2cQqTu90zxBXjAPcO2\nfG3OvQ+8UwbU+jQ4dZWcDxO7c7f8xGQmq6B0kN/OwjW8PSFYqQ5pv40PAoGBANSV\nyeYoiJA+q7OtrHZ9Kpwq2WzkOkXNaQB4/lwdlnCOo8hM2/tR/yURlTvECYWg9lso\nHAILhaLHZiRwh58woDyjIafRU9xPJO7Nl2SNmQTBg8q76ucqerWxoUVfX0y5K2iu\n4/Q9QEJe72QdMqHhqclSsmDUihGVI1SuJpTfr2ctAoGBANQKOFYUpk8k4vt57hkk\ne5lP9OjJgiBqsUP888UedmiFF0cdMiRdaXqnjiUCgLIPJRApjBRkgeGyh0tZ31UU\nQzlnE+iAA/q0fgnf1he5A3NlImVxf4OAvnCW61lKPczPE9FJzO/eJvh0V624TWWf\ng+HJHrIAfAxaL9LVIJbAAoD+\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-em4z5@desafio-m6-apx.iam.gserviceaccount.com",
  client_id: "115906820321517260557",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-em4z5%40desafio-m6-apx.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://desafio-m6-apx-default-rtdb.firebaseio.com",
});

const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };
