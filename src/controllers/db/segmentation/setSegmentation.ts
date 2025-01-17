import { Collections, FieldMandatoryName, FieldType, Segmentation, SegmentationType } from "delib-npm"
import { collection, doc, setDoc } from "firebase/firestore"
import { firebaseDb } from "../config"

export function setSegmentation(documentId:string){
    try {
        const segmentationRef = collection(firebaseDb, Collections.statementSegments)

        const name:Segmentation = {
            statementId: documentId,
            order:0,
            title:"שם מלא",
            fieldMandatoryName: FieldMandatoryName.displayName,
            type:SegmentationType.string,
            filedType:FieldType.text,
           isRequired:false
        }

        const phoneNumber:Segmentation = {
            statementId: documentId,
            order:2,
            title:"מספר טלפון",
            fieldMandatoryName: "phoneNumber",
            filedType:FieldType.tel,
            type:SegmentationType.string,
            isRequired:true
        }

        const community:Segmentation = {
            statementId: documentId,
            order:1,
            title:"ישוב",
            type:SegmentationType.array,
            isRequired:true,
            arrayType:SegmentationType.string,
            array:[
                `אבנ"י איתן`,
                `אודם`,
                `אורטל`,
                `אל-רום`,
                `אלוני הבשן`,
                'אליעד',
                "אניעם",
                "אפיק",
                "בני יהודה",
                "גבעת יואב",
                "גשור",
                "חד-נס",
                "חיספין",
                "יונתן",
                "כנף",
                "כפר חרוב",
                "מבוא חמה",
                "מיצר",
                "מעלה גמלא",
                "מרום גולן",
                "נאות גולן",
                "נוב",
                "נווה אטיב",
                "נטור",
                "נמרוד",
                "עין זיוון",
                "קדמת צבי",
                "קלע אלון",
                "קשת",
                "רמות",
                "רמות טראמפ",
                "רמת מגשימים",
                "שעל"
            ]
        }



        setDoc(doc(segmentationRef, `${documentId}_name`), name);
        setDoc(doc(segmentationRef, `${documentId}_community`), community);
        setDoc(doc(segmentationRef, `${documentId}_phoneNumber`), phoneNumber);

    } catch (error) {
        console.error(error)
    }
}