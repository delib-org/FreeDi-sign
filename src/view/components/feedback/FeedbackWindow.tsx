import Button from '../buttons/button/Button';
import './FeedbackWindow.scss';
import StarIcon from '../../../assets/icons/star.svg?react';
import { ButtonType } from '../../../model/enumsModel';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../../controllers/hooks/useLanguage';
import { selectUser } from '../../../controllers/slices/userSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    collection,
    doc,
    getDocs,
    query,
    where,
    limit,
    setDoc
} from 'firebase/firestore';
import { firebaseDb } from '../../../controllers/db/config';

interface FeedbackWindowProps {
    readonly onCloseClick: () => void;
}

interface FeedbackInput {
    stars: number;
    feedback: string;
    groupId: string;
    userId: string;
}

export default function FeedbackWindow({ onCloseClick }: FeedbackWindowProps) {
    const { t } = useLanguage();
    const user = useSelector(selectUser);
    const groupId = useParams<{ statementId: string }>();

    const [feedbackInput, setFeedbackInput] = useState<FeedbackInput>({
        stars: 0,
        feedback: '',
        userId: user?.uid ?? '',
        groupId: groupId.statementId ?? '',
    });
    const [existingFeedbackId, setExistingFeedbackId] = useState<string | null>(null);

    const handleFeedback = async () => {
        if (!user?.uid || !groupId.statementId) {
            console.error('User ID or Group ID is missing');
            return;
        }

        try {
            const feedbackCollectionRef = collection(
                firebaseDb,
                'freediSignFeedback'
            );

            const uniqueDocId = `${user.uid}_${groupId.statementId}`;
            const feedbackDocRef = doc(feedbackCollectionRef, uniqueDocId);

            await setDoc(feedbackDocRef, {
                ...feedbackInput,
                updatedAt: new Date().toISOString(),
            });

            onCloseClick();
        } catch (error) {
            console.error('Error saving feedback:', error);
        }
    };

    const handleStarClick = (rating: number) => {
        setFeedbackInput({
            ...feedbackInput,
            stars: rating,
        });
    };

    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
                <button
                    type='button'
                    key={ratingValue}
                    onClick={() => handleStarClick(ratingValue)}
                    className={`star ${
                        ratingValue <= feedbackInput.stars ? 'starFilled' : ''
                    }`}
                >
                    <StarIcon />
                </button>
            );
        });
    };

    useEffect(() => {
        const getFeedback = async () => {
            if (user?.uid && groupId.statementId) {
                try {
                    const q = query(
                        collection(firebaseDb, 'freediSignFeedback'),
                        where('userId', '==', user.uid),
                        where('groupId', '==', groupId.statementId),
                        // Limit to 1 since only one feedback per user per group is allowed
                        limit(1)
                    );

                    const feedbackDoc = await getDocs(q).then(snapshot => snapshot.docs[0]);
                    
                    if (feedbackDoc) {
                        const feedbackData = feedbackDoc.data();
                        setExistingFeedbackId(feedbackDoc.id);
                        setFeedbackInput({
                            stars: feedbackData.stars,
                            feedback: feedbackData.feedback,
                            userId: feedbackData.userId,
                            groupId: feedbackData.groupId,
                        });
                    }
                } catch (error) {
                    console.error('Error fetching feedback:', error);
                }
            }
        };

        getFeedback();
    }, [user?.uid, groupId.statementId]);

    return (
        <main className='feedbackWindow'>
            <h1 className='title'>אנו מעריכים את המשוב שלכם</h1>
            <p className='subTitle'>
                אנחנו ממשיכים לשפר את חווית המשתמש. אנא הקדישו רגע להערכת המערכת וספרו
                לנו מה דעתכם.
            </p>
            <div className='starsBox'>{renderStars()}</div>
            <textarea
                name='feedback'
                id='feedback'
                className='feedbackText'
                placeholder='כתבו לנו כאן את המשוב שלכם...'
                value={feedbackInput.feedback ?? ''}
                onChange={(e) =>
                    setFeedbackInput({
                        ...feedbackInput,
                        feedback: e.target.value,
                    })
                }
            ></textarea>
            <Button
                text={existingFeedbackId ? 'Update feedback' : 'Send my feedback'}
                buttonType={ButtonType.primary}
                isSelected={true}
                onClick={handleFeedback}
            />
            <a href='https://delib.org' target='_blank' className='delibLink'>
                {t('From the Deliberative Democracy Institute')}
            </a>
        </main>
    );
}