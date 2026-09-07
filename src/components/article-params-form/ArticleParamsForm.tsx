import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	setArticleState: Dispatch<SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const formRef = useRef<HTMLElement>(null);
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
				isOpen &&
				formRef.current &&
				!formRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						event.preventDefault();
						setArticleState(formState);
						setIsOpen(false);
					}}
					onReset={() => {
						setFormState(defaultArticleState);
						setArticleState(defaultArticleState);
						setIsOpen(false);
					}}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => {
							setFormState({
								...formState,
								fontFamilyOption: option,
							});
						}}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => {
							setFormState({
								...formState,
								fontSizeOption: option,
							});
						}}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) => {
							setFormState({
								...formState,
								fontColor: option,
							});
						}}
					/>
					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) => {
							setFormState({
								...formState,
								backgroundColor: option,
							});
						}}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) => {
							setFormState({
								...formState,
								contentWidth: option,
							});
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
