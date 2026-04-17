import { render, screen, fireEvent } from '@testing-library/react';
import ContactPage, {
  TextName,
  EmailField,
  PasswordField,
  SelectField,
  RadioGroup,
  CheckboxGroup,
  TextareaField,
} from '@/app/contact/page';

describe('ContactPage', () => {
  it('renderiza sem erros', () => {
    render(<ContactPage />);
  });

  it('exibe o texto descritivo do formulário', () => {
    render(<ContactPage />);
    expect(screen.getByText(/Formulário com todos os tipos de campos HTML./i)).toBeInTheDocument();
  });

  describe('renderização condicional pelo SelectField', () => {
    it('não exibe radio, checkbox nem textarea antes de selecionar', () => {
      render(<ContactPage />);
      expect(screen.queryByText(/Preferência de contato/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Interesses/i)).not.toBeInTheDocument();
      expect(screen.queryByPlaceholderText(/Escreva sua mensagem/i)).not.toBeInTheDocument();
    });

    it('exibe o fieldset de radio ao selecionar campo-1', () => {
      render(<ContactPage />);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'br' } });
      expect(screen.getByText(/Preferência de contato/i)).toBeInTheDocument();
    });

    it('exibe o fieldset de checkbox ao selecionar campo-2', () => {
      render(<ContactPage />);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'us' } });
      expect(screen.getByText(/Interesses/i)).toBeInTheDocument();
    });

    it('exibe o textarea ao selecionar campo-3', () => {
      render(<ContactPage />);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'uk' } });
      expect(screen.getByPlaceholderText(/Escreva sua mensagem/i)).toBeInTheDocument();
    });
  });
});

describe('TextName', () => {
  it('renderiza o label e o input', () => {
    render(<TextName name="name" label="Nome" placeholder="Seu nome" />);
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Seu nome')).toBeInTheDocument();
  });

  it('campo é obrigatório', () => {
    render(<TextName name="name" label="Nome" placeholder="Seu nome" />);
    expect(screen.getByPlaceholderText('Seu nome')).toBeRequired();
  });

  it('aceita texto com apenas letras', () => {
    render(<TextName name="name" label="Nome" placeholder="Seu nome" />);
    fireEvent.change(screen.getByPlaceholderText('Seu nome'), { target: { value: 'Anderson' } });
    expect(screen.getByPlaceholderText('Seu nome')).toHaveValue('Anderson');
    expect(screen.queryByText(/Apenas letras são permitidas/i)).not.toBeInTheDocument();
  });

  it('exibe erro e filtra caracteres inválidos', () => {
    render(<TextName name="name" label="Nome" placeholder="Seu nome" />);
    fireEvent.change(screen.getByPlaceholderText('Seu nome'), { target: { value: 'And3rs@n!' } });
    expect(screen.getByText(/Apenas letras são permitidas/i)).toBeInTheDocument();
  });
});

describe('EmailField', () => {
  it('renderiza o label e o input', () => {
    render(<EmailField name="email" label="E-mail" placeholder="seu@email.com" />);
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('seu@email.com')).toBeInTheDocument();
  });

  it('campo é do tipo email', () => {
    render(<EmailField name="email" label="E-mail" placeholder="seu@email.com" />);
    expect(screen.getByPlaceholderText('seu@email.com')).toHaveAttribute('type', 'email');
  });

  it('campo é obrigatório', () => {
    render(<EmailField name="email" label="E-mail" placeholder="seu@email.com" />);
    expect(screen.getByPlaceholderText('seu@email.com')).toBeRequired();
  });
});

describe('PasswordField', () => {
  it('renderiza o label e o input', () => {
    render(<PasswordField name="password" label="Senha" placeholder="••••••••" />);
    expect(screen.getByText('Senha')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('campo é obrigatório', () => {
    render(<PasswordField name="password" label="Senha" placeholder="••••••••" />);
    expect(screen.getByPlaceholderText('••••••••')).toBeRequired();
  });

  it('exibe erro quando senha tem menos de 8 caracteres', () => {
    render(<PasswordField name="password" label="Senha" placeholder="••••••••" />);
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'Ab1!' } });
    expect(screen.getByText(/Mínimo de 8 caracteres/i)).toBeInTheDocument();
  });

  it('exibe erro quando senha não tem número', () => {
    render(<PasswordField name="password" label="Senha" placeholder="••••••••" />);
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'Abcdefg!' } });
    expect(screen.getByText(/pelo menos um número/i)).toBeInTheDocument();
  });

  it('exibe erro quando senha não tem caractere especial', () => {
    render(<PasswordField name="password" label="Senha" placeholder="••••••••" />);
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'Abcdefg1' } });
    expect(screen.getByText(/pelo menos um caractere especial/i)).toBeInTheDocument();
  });

  it('não exibe erros quando senha é válida', () => {
    render(<PasswordField name="password" label="Senha" placeholder="••••••••" />);
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'Abcdef1!' } });
    expect(screen.queryByText(/Mínimo de 8 caracteres/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/pelo menos um número/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/pelo menos um caractere especial/i)).not.toBeInTheDocument();
  });

  it('não exibe erros com campo vazio', () => {
    render(<PasswordField name="password" label="Senha" placeholder="••••••••" />);
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: '' } });
    expect(screen.queryByText(/Mínimo de 8 caracteres/i)).not.toBeInTheDocument();
  });
});

describe('SelectField', () => {
  const options = [
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'EUA' },
  ];

  it('renderiza o label e as opções', () => {
    render(<SelectField name="country" label="País" options={options} />);
    expect(screen.getByText('País')).toBeInTheDocument();
    expect(screen.getByText('Brasil')).toBeInTheDocument();
    expect(screen.getByText('EUA')).toBeInTheDocument();
  });

  it('campo é obrigatório', () => {
    render(<SelectField name="country" label="País" options={options} />);
    expect(screen.getByRole('combobox')).toBeRequired();
  });

  it('Deve chamar onChange com o valor selecionado Quando valor mudar', () => {
    const handleChange = jest.fn();
    render(<SelectField name="country" label="País" options={options} onChange={handleChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'br' } });
    expect(handleChange).toHaveBeenCalledWith('br');
  });
});

describe('RadioGroup', () => {
  const options = ['E-mail', 'Telefone', 'WhatsApp'];

  it('renderiza a legenda e todas as opções', () => {
    render(<RadioGroup legend="Preferência" name="pref" options={options} />);
    expect(screen.getByText('Preferência')).toBeInTheDocument();
    options.forEach((opt) => expect(screen.getByText(opt)).toBeInTheDocument());
  });

  it('renderiza inputs do tipo radio', () => {
    render(<RadioGroup legend="Preferência" name="pref" options={options} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(options.length);
  });

  it('todos os radios compartilham o mesmo name', () => {
    render(<RadioGroup legend="Preferência" name="pref" options={options} />);
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toHaveAttribute('name', 'pref');
    });
  });

  it('selecionar uma opção desmarca as demais', () => {
    render(<RadioGroup legend="Preferência" name="pref" options={options} />);
    const [first, second] = screen.getAllByRole('radio');
    fireEvent.click(first);
    expect(first).toBeChecked();
    fireEvent.click(second);
    expect(second).toBeChecked();
    expect(first).not.toBeChecked();
  });

  it('chama onChange com o valor selecionado', () => {
    const handleChange = jest.fn();
    render(<RadioGroup legend="Preferência" name="pref" options={options} onChange={handleChange} />);
    fireEvent.click(screen.getAllByRole('radio')[2]); // WhatsApp
    expect(handleChange).toHaveBeenCalledWith('whatsapp');
  });
});

describe('ContactPage — campo WhatsApp condicional', () => {
  it('não Deve exibir o campo WhatsApp antes de selecionar', () => {
    render(<ContactPage />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'br' } });
    expect(screen.queryByPlaceholderText(/99999-9999/i)).not.toBeInTheDocument();
  });

  it('Deve exibir o campo WhatsApp Quando selecionar a opção WhatsApp', () => {
    render(<ContactPage />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'br' } });
    fireEvent.click(screen.getByDisplayValue('whatsapp'));
    expect(screen.getByPlaceholderText(/99999-9999/i)).toBeInTheDocument();
  });

  it('Deve oculta o campo WhatsApp Quando trocar para outra opção', () => {
    render(<ContactPage />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'br' } });
    fireEvent.click(screen.getByDisplayValue('whatsapp'));
    fireEvent.click(screen.getByDisplayValue('e-mail'));
    expect(screen.queryByPlaceholderText(/99999-9999/i)).not.toBeInTheDocument();
  });
});

describe('CheckboxGroup', () => {
  const options = [
    { value: 'design', label: 'Design' },
    { value: 'desenvolvimento', label: 'Desenvolvimento' },
    { value: 'marketing', label: 'Marketing' },
  ];

  it('renderiza a legenda e todas as opções', () => {
    render(<CheckboxGroup legend="Interesses" name="interests" options={options} />);
    expect(screen.getByText('Interesses')).toBeInTheDocument();
    options.forEach((opt) => expect(screen.getByText(opt.label)).toBeInTheDocument());
  });

  it('renderiza inputs do tipo checkbox', () => {
    render(<CheckboxGroup legend="Interesses" name="interests" options={options} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(options.length);
  });

  it('cada checkbox tem o value correto', () => {
    render(<CheckboxGroup legend="Interesses" name="interests" options={options} />);
    const checkboxes = screen.getAllByRole('checkbox');
    options.forEach((opt, i) => expect(checkboxes[i]).toHaveAttribute('value', opt.value));
  });

  it('permite marcar múltiplas opções simultaneamente', () => {
    render(<CheckboxGroup legend="Interesses" name="interests" options={options} />);
    const [first, second] = screen.getAllByRole('checkbox');
    fireEvent.click(first);
    fireEvent.click(second);
    expect(first).toBeChecked();
    expect(second).toBeChecked();
  });

  it('permite desmarcar uma opção sem afetar as demais', () => {
    render(<CheckboxGroup legend="Interesses" name="interests" options={options} />);
    const [first, second] = screen.getAllByRole('checkbox');
    fireEvent.click(first);
    fireEvent.click(second);
    fireEvent.click(first);
    expect(first).not.toBeChecked();
    expect(second).toBeChecked();
  });

  it('chama onChange com array acumulado ao marcar múltiplos', () => {
    const handleChange = jest.fn();
    render(<CheckboxGroup legend="Interesses" name="interests" options={options} onChange={handleChange} />);
    const [first, second, third] = screen.getAllByRole('checkbox');
    fireEvent.click(first);
    fireEvent.click(second);
    fireEvent.click(third);
    expect(handleChange).toHaveBeenNthCalledWith(1, ['design']);
    expect(handleChange).toHaveBeenNthCalledWith(2, ['design', 'desenvolvimento']);
    expect(handleChange).toHaveBeenNthCalledWith(3, ['design', 'desenvolvimento', 'marketing']);
  });

  it('chama onChange sem o valor ao desmarcar', () => {
    const handleChange = jest.fn();
    render(<CheckboxGroup legend="Interesses" name="interests" options={options} onChange={handleChange} />);
    const [first, second] = screen.getAllByRole('checkbox');
    fireEvent.click(first);
    fireEvent.click(second);
    fireEvent.click(first);
    expect(handleChange).toHaveBeenLastCalledWith(['desenvolvimento']);
  });
});

describe('TextareaField', () => {
  it('renderiza o label e o textarea', () => {
    render(<TextareaField name="message" label="Mensagem" placeholder="Digite aqui..." />);
    expect(screen.getByText('Mensagem')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite aqui...')).toBeInTheDocument();
  });

  it('textarea está associado ao label pelo id', () => {
    render(<TextareaField name="message" label="Mensagem" placeholder="Digite aqui..." />);
    expect(screen.getByLabelText('Mensagem')).toBeInTheDocument();
  });

  it('aceita digitação', () => {
    render(<TextareaField name="message" label="Mensagem" placeholder="Digite aqui..." />);
    const textarea = screen.getByPlaceholderText('Digite aqui...');
    fireEvent.change(textarea, { target: { value: 'Olá mundo' } });
    expect(textarea).toHaveValue('Olá mundo');
  });
});
