import React, { FC, useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Statement } from 'delib-npm';

import styles from './Section.module.scss';
import NewParagraph from '../newParagraph/NewParagraph';
import { isEditSelector } from '../../../../controllers/slices/editSlice';
import SubParagraphs from './subParagraphs/SubParagraphs';
import SubSections from './subSections/SubSections';
import SectionTitle from './sectionTitle/SectionTitle';
import NewSection from '../newSection/NewSection';
import {
	getBullet,
	getViewWidth,
} from '../../../../controllers/general.ts/helpers';
import { useLanguage } from '../../../../controllers/hooks/useLanguage';
import ArrowUpIcon from '../../../../assets/icons/arrowUp.svg?react';
import { TOC_WIDTH } from '../../../../model/toc';

interface Props {
	statement: Statement;
	order: number;
	parentLevel: number;
	parentBullet: string;
}

const Section: FC<Props> = ({
	statement,
	order,
	parentBullet,
	parentLevel,
}) => {
	const { statementId } = statement;
	if (!statementId) {
		throw new Error('statementId is required');
	}

	const isEdit = useSelector(isEditSelector);
	const { dir, t } = useLanguage();
	const resizeTimeoutRef = useRef<number>();

	// State
	const [isTitleReady, setIsTitleReady] = useState(true);
	const [subSectionsLength, setSubSectionsLength] = useState<number>(0);
	const [isTOC, setIsTOC] = useState<boolean>(getViewWidth() < TOC_WIDTH);

	// Handlers
	const handleResize = useCallback(() => {
		if (resizeTimeoutRef.current) {
			window.clearTimeout(resizeTimeoutRef.current);
		}

		resizeTimeoutRef.current = window.setTimeout(() => {
			setIsTOC(getViewWidth() < TOC_WIDTH);
		}, 250);
	}, []);

	// Effects
	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (resizeTimeoutRef.current) {
				window.clearTimeout(resizeTimeoutRef.current);
			}
		};
	}, [handleResize]);

	// Compute values
	const bullet = getBullet(parentBullet, order);
	const level = parentLevel + 1;

	return (
		<section
			className={`${styles.section} ${
				dir === 'rtl' ? styles['section--rtl'] : ''
			} ${isEdit ? styles.edit : ''}`}
		>
			<SectionTitle
				bullet={bullet}
				level={level}
				statement={statement}
				setIsTitleReady={setIsTitleReady}
				isTitleReady={isTitleReady}
			/>
			{isTitleReady && (
				<div
					className={`${styles.sectionsWrapper} ${
						dir === 'rtl' ? styles['sectionsWrapper--rtl'] : ''
					}`}
				>
					<div className={styles.paragraphs}>
						<SubParagraphs parentStatement={statement} />
						<NewParagraph statement={statement} order={order} />
					</div>

					{isTOC && (
						<a href='#toc' className={styles.back}>
							{t('Back to table of contents')}
							<div
								style={{
									transform: dir === 'ltr' ? 'scaleX(1)' : 'scaleX(-1)',
								}}
							>
								<ArrowUpIcon />
							</div>
						</a>
					)}

					<div className={styles.sections}>
						<SubSections
							setSubSectionsLength={setSubSectionsLength}
							statement={statement}
							parentBullet={bullet}
							parentLevel={level}
						/>
					</div>

					<NewSection
						statement={statement}
						order={subSectionsLength + 1}
						parentBullet={bullet}
					/>
				</div>
			)}
		</section>
	);
};

export default React.memo(Section);
