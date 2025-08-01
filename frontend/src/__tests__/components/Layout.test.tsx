import { fireEvent, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { renderWithProviders } from '@/utilities/testing';
import Header from '@/components/Layout/Header';
import NftList from '@/components/Nft/NftList';
import Footer from '@/components/Layout/Footer';
import { NFTS, TEST } from '@/utilities/constants';

// Unit/Integration Test - Layout
describe('Layout Unit/Integration Test', () => {
  const { getByRole, getAllByTestId } = screen;
  const { REQUEST, ID } = TEST;
  const area = {
    header: 'header',
    footer: 'footer',
  };

  // Handlers
  const assertSection = (section: string, role: string) => {
    renderWithProviders(
      <MockedProvider mocks={[REQUEST.QUERY.NFTS]}>
        {section === area.header ? <Header /> : <Footer />}
      </MockedProvider>,
    );
    expect(getByRole(role)).toBeInTheDocument();
  };

  // Setup
  beforeEach(() => {});
  // Tests
  it('Renders the Header section', () => {
    assertSection(area.header, 'banner');
  });
  it('Searches for a NFT', () => {
    assertSection(area.header, 'textbox');

    const search = getByRole('textbox');
    const value = NFTS[0].name;

    fireEvent.change(search, { target: { value } });

    renderWithProviders(<NftList nfts={NFTS} search={true} />);
    expect(getAllByTestId(ID.LIST_ELEMENT)[0]).toHaveTextContent(value);
  });
  it('Renders the Footer section', () => {
    assertSection(area.footer, 'contentinfo');
  });
});
