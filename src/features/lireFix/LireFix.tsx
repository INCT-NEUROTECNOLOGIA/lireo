import { useState, useRef, useEffect } from 'react';
import { SAMPLE_PHRASES } from './texts/lireFixPhrases.ts';
import useLireFix from './hooks/useLireFix.ts';
import { ROUTE_PATHS } from '../../config/routes.ts';

export default function LireFix() {
	// Retrieve hook state and functions for managing phrases, selection, and verification
	const {
		phraseId,
		setPhraseId,
		phrase,
		selectedIndex,
		setSelectedIndex,
		showExplanation,
		verify,
		phrases,
		isCorrect,
	} = useLireFix(SAMPLE_PHRASES);

	const current = phrase || phrases[0];
	const text = current?.textWithError || '';
	const wrong = current?.wrongWord || '';

	const [fontSize, setFontSize] = useState<number>(24);
	const [showAlternatives, setShowAlternatives] = useState(false);
	const [feedback, setFeedback] = useState<null | { type: 'success' | 'error'; text: string }>(null);
	const [correctAnswerClicked, setCorrectAnswerClicked] = useState(false);
	const [lastIncorrectWordClicked, setLastIncorrectWordClicked] = useState<string>('');
	const resetTimeoutRef = useRef<number | null>(null);

	useEffect(() => {
		setShowAlternatives(false);
		setFeedback(null);
		setCorrectAnswerClicked(false);
		setLastIncorrectWordClicked('');
		if (resetTimeoutRef.current) {
			clearTimeout(resetTimeoutRef.current);
			resetTimeoutRef.current = null;
		}
	}, [phraseId]);

	useEffect(() => {
		return () => {
			if (resetTimeoutRef.current) {
				clearTimeout(resetTimeoutRef.current);
				resetTimeoutRef.current = null;
			}
		};
	}, []);

	function sanitize(word: string) {
		// Normalize word: remove accents, special characters, and convert to lowercase
		// This allows accurate comparison between words regardless of formatting
		return word
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^\p{L}\p{N}]+/gu, '')
			.toLowerCase();
	}

	const handleSelectWord = (word: string) => {
		// Check if the selected word is the incorrect one
		if (sanitize(word) === sanitize(wrong)) {
			setFeedback({ type: 'success', text: 'Muito bem! Você identificou a palavra incorreta.' });
			setShowAlternatives(true);
			setCorrectAnswerClicked(true);
		} else {
			// Track the last incorrect word clicked for visual feedback (light blue highlight)
			const sanitized = sanitize(word);
			setLastIncorrectWordClicked(sanitized);
			if (correctAnswerClicked) {
				setShowAlternatives(false);
				setFeedback({ type: 'error', text: 'Tente novamente. Essa palavra está correta na frase.' });
				setCorrectAnswerClicked(false);
				return;
			}
			setFeedback({ type: 'error', text: 'Tente novamente. Essa palavra está correta na frase.' });
		}
	};

	const handleVerify = () => {
		verify();
		if (selectedIndex !== null) {
			const chosen = current.alternatives[selectedIndex];
			const correct = current.correctWord;
			const chosenClean = chosen.replace(/\.+$/, '').toLowerCase().trim();
			const correctClean = correct.replace(/\.+$/, '').toLowerCase().trim();
			const ok = chosenClean === correctClean;
			if (ok) {
				setFeedback({ type: 'success', text: 'Muito bem! Você escolheu a palavra correta.' });
			} else {
				setFeedback({ type: 'error', text: 'Tente novamente. Essa não é a palavra correta.' });
			}
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
			{/* Header com Descrição */}
			<div style={{
				background: 'linear-gradient(to right, #adf5a9, #baeaff)',
				padding: '1rem 2rem',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '0.3rem',
				color: '#235721',
				marginBottom: '0',
			}}>
				<h1 style={{ margin: '0', fontSize: '1.8rem', textAlign: 'center' }}>LireFix</h1>
			<ul style={{ margin: '0.3rem 0 0 0', paddingLeft: '1.5rem', color: '#235721', fontSize: '1rem', lineHeight: '1.4', textAlign: 'center', listStylePosition: 'inside' }}>
					<li>O objetivo desta atividade é desempenhar a atuação linguística e a compreensão do sentido das palavras dentro de uma frase.</li>
					<li>Durante a tarefa, o leitor vará uma frase contendo uma palavra incorreta.</li>
					<li>Ao identificar a, sugerido um das opções de palavras, a leia necessário escolher aquela que melhor se encaixa no contexto da frase.</li>
					<li>A atividade contribui para o desenvolvimento da leitura atenta, ampliação de vocabulário e compreensão semântica.</li>
					<li>Para mais informações, acesse o <a href={ROUTE_PATHS.USER_GUIDE_LIRE_GROW} target="_blank" rel="noopener noreferrer" style={{ color: '#33aa96', fontWeight: 'bold', textDecoration: 'none' }}>Guia do Usuário.</a></li>
				</ul>
			</div>

			{/* Conteúdo Principal */}
			<div style={{ padding: '1.5rem 2rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, overflowY: 'auto' }}>
				{/* Tamanho de Fonte */}
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					alignSelf: 'start',
					marginBottom: '1.5rem',
					gap: '0.6rem',
					width: '20rem',
				}}>
					<p style={{ margin: '0', marginBottom: '0.3rem', fontSize: '1.3rem', color: '#333', fontWeight: '500' }}>Tamanho de fonte</p>
					<div style={{
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: '0.3rem',
						width: '100%',
					}}>
						<span style={{ fontSize: '0.95rem', color: '#333' }}>{fontSize}</span>
						<input
							type="range"
							min="16"
							max="60"
							step="1"
							value={fontSize}
							onChange={(e) => setFontSize(Number(e.target.value))}
							style={{
								width: '100%',
								appearance: 'none',
								height: '6px',
								borderRadius: '5px',
								background: 'linear-gradient(to right, #69c464, #235721) 0% 0% / var(--progress, 50%) 100% no-repeat, #e5f6fa',
								cursor: 'pointer',
								border: '1px solid #ddd',
								WebkitAppearance: 'none',
								MozAppearance: 'none',
								'--progress': `${((fontSize - 16) / 44) * 100}%`,
							} as any}
						/>
						<span style={{ fontSize: '0.95rem', color: '#333' }}>+</span>
					</div>
				</div>

				{/* Selector de Frases */}
				<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
					<select
						value={phraseId}
						onChange={(e) => setPhraseId(e.target.value)}
						style={{
							backgroundColor: '#33aa96',
							color: 'white',
							width: '20rem',
							padding: '0.7rem 1rem',
							fontSize: '1.2rem',
							fontWeight: '600',
							border: 'none',
							borderRadius: '8px',
							cursor: 'pointer',
							appearance: 'none',
							paddingRight: '2.5rem',
							backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3e%3cpolyline points=%226 9 12 15 18 9%22%3e%3c/polyline%3e%3c/svg%3e")',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'right 0.7rem center',
							backgroundSize: '1.5em 1.5em',
						}}
					>
						<option value="" disabled>Selecione uma frase</option>
						{phrases.map((p) => (
							<option key={p.id} value={p.id}>{p.textWithError}</option>
						))}
					</select>
				</div>

				{/* Instrução */}
				<p style={{ color: '#235721', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: '500', textAlign: 'left', width: '100%' }}>
					Leia a frase a seguir e clique na palavra <strong>INCORRETA</strong>
				</p>

				{/* Frase */}
				<p style={{
					fontSize: `${fontSize}px`,
				lineHeight: '1.6',
				padding: '1rem',
				backgroundColor: 'white',
				color: '#0a3b50',
			marginBottom: showAlternatives ? '1rem' : '0.5rem',
					whiteSpace: 'normal',
					wordWrap: 'break-word',
					width: '100%',
					textAlign: 'justify',
					border: 'none',
				}}>
					{(text || '').split(' ').map((word: string, idx: number) => {
						const isWrongWord = sanitize(word) === sanitize(wrong);
						const isCurrentlySelected = lastIncorrectWordClicked === sanitize(word);
						return (
							<span
								key={idx}
								onClick={() => handleSelectWord(word)}
								style={{
									color: showAlternatives && isWrongWord ? '#d32f2f' : isCurrentlySelected ? '#42A5F5' : '#0a3b50',
									fontWeight: showAlternatives && isWrongWord ? '700' : '400',
									cursor: 'pointer',
									padding: showAlternatives && isWrongWord ? '2px 4px' : isCurrentlySelected ? '2px 4px' : '0',
									marginRight: '0.2em',
								}}
							>
								{word}
							</span>
						);
					})}
				</p>

{/* Feedback - Apenas para identificação da palavra incorreta */}
		{feedback && !showAlternatives && (
			<div style={{
				padding: '1rem',
				borderRadius: '8px',
		marginBottom: '2rem',
		backgroundColor: 'white',
		color: feedback.type === 'success' ? '#1b5e20' : '#0a85b8',
		width: '100%',
		textAlign: 'center',
		border: feedback.type === 'success' ? '2px solid #81c784' : '2px solid #0a85b8',
		fontSize: '1.1rem',
		}}>
			{feedback.text}
		</div>
		)}

		{feedback && feedback.type === 'success' && showAlternatives && (
			<div style={{
				padding: '1rem',
				borderRadius: '8px',
				marginBottom: '1.5rem',
				backgroundColor: 'white',
				color: '#1b5e20',
				width: '100%',
				textAlign: 'center',
				border: '2px solid #81c784',
				fontSize: '1.1rem',
				}}>
					{feedback.text}
				</div>
			)}

				{/* Alternativas */}
				{showAlternatives && (
					<div style={{ marginBottom: '1rem', width: '100%' }}>
						<p style={{ color: '#0a3b50', fontSize: '0.95rem', marginBottom: '0.8rem', fontWeight: '600', textAlign: 'center' }}>
							Agora escolha a palavra correta para completar a frase:
						</p>
						<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
							{(current.alternatives || []).map((alt: string, idx: number) => {

								const isSelected = selectedIndex === idx;
								return (
									<label
										key={idx}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.8rem',
											padding: '0.8rem',
											backgroundColor: isSelected ? '#baeaff' : 'white',
											borderRadius: '4px',
											cursor: 'pointer',
											border: isSelected ? '2px solid #81d4fa' : '1px solid #ddd',
										}}
									>
										<input
											type="radio"
											name="alternatives"
											checked={selectedIndex === idx}
											onChange={() => setSelectedIndex(idx)}
											style={{ cursor: 'pointer' }}
										/>
										<span style={{ color: '#0a3b50' }}>{alt}</span>
									</label>
								);
							})}
						</div>
					</div>
				)}

{/* Botão Verificar e Explicação/Feedback */}
			{showAlternatives && (
			<div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', width: '100%' }}>
				<button
					onClick={handleVerify}
					style={{
						padding: '0.7rem 1rem',
						backgroundColor: '#2d7a6f',
						color: 'white',
						border: '2px solid #2d7a6f',
						borderRadius: '8px',
						cursor: 'pointer',
						fontSize: '1rem',
						fontWeight: '600',
						width: '12rem',
						transition: 'all 0.3s ease',
					}}
					onMouseEnter={(e) => {
						(e.target as HTMLButtonElement).style.backgroundColor = '#1f5551';
						(e.target as HTMLButtonElement).style.borderColor = '#1f5551';
					}}
					onMouseLeave={(e) => {
						(e.target as HTMLButtonElement).style.backgroundColor = '#2d7a6f';
						(e.target as HTMLButtonElement).style.borderColor = '#2d7a6f';
					}}
				>
					Verificar
				</button>

				{showExplanation && (
					<div style={{
						padding: '0.8rem 1rem',
						backgroundColor: 'white',
						borderRadius: '8px',
					color: isCorrect ? '#1b5e20' : '#c62828',
					border: isCorrect ? '2px solid #81c784' : '2px solid #e53935',
						flex: 1,
						textAlign: 'center',
						fontSize: '1.1rem',
						fontWeight: '500',
					}}>
						{isCorrect ? (
							<><strong>Opção correta!</strong> {current.explanation || 'Essa é a palavra mais adequada para a frase.'}</>
						) : (
							<span>{feedback?.text || 'Tente novamente. Essa não é a palavra correta.'}</span>
						)}
						</div>
					)}
					</div>
				)}

			</div>
		</div>
	);
}
