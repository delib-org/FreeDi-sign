import { useEffect, useState } from 'react';

import { Statement } from 'delib-npm';

import {
	listenToStatements,
	listenToUserTopStatements,
} from '../db/statements/getStatements';
import { useSelector } from 'react-redux';
import {
	selectStatementsByCreatorId,
	selectTopStatements,
} from '../slices/statementsSlice';
import { selectUser } from '../slices/userSlice';
import { UnsubscribeObject } from '../../model/unsubscribeModel';
import { store } from '../../model/store';

export function useStatements() {
	const user = useSelector(selectUser);

	if (!user)
		return { statements: [], isLoading: false, error: 'User not found' };

	const userId = user.uid;
	const statements: Statement[] = useSelector(
		selectStatementsByCreatorId(userId)
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const unsubscribe = listenToStatements(setIsLoading, setError);
		return () => {
			unsubscribe();
		};
	}, []);

	return { statements, isLoading, error };
}

export function useUserTopStatements() {
	const user = store.getState().user.user;
	const unsubscribes: UnsubscribeObject[] = [];

	const statements: Statement[] = useSelector(selectTopStatements);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (user === null) return;
		const unsubscribe = listenToUserTopStatements(
			unsubscribes,
			setIsLoading,
			setError,
			30
		);
		return () => {
			unsubscribe();
			unsubscribes.forEach((unsubscribe) => {
				unsubscribe.unsubFunction();
			});
		};
	}, [user]);

	return { statements, isLoading, error };
}
