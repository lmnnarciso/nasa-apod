import React from 'react'
import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import {setupWorker, rest} from 'msw'
import {setupServer} from 'msw/node'
import {Home} from './Home'
import {NasaAPOD} from './types/nasaApod'
import moment from 'moment'
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

afterEach(() => {
  jest.resetAllMocks()
})

const server = setupServer(
  rest.get('/user', (req, res, ctx) => {
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        copyright: 'copyright',
        date: moment().format('YYYY-mm-dd'),
        explanation: 'string',
        hdurl: 'string',
        media_type: 'image',
        service_version: 'v1',
        url: 'image',
      }),
    )
  }),
)

// test('add favorite', async () => {
//   let {getByText} = render(<Home />)
//   // expect(screen.queryByText(/Loading.../i)).toBeTruthy();
//   // await waitFor(() => expect(screen.getByText("Add to favorites").not.toBeNull()))
//   // fireEvent.click(screen.queryByText('Add to favorites'))
//   // expect(window.fetch).toHaveBeenCalledTimes(1);

//   expect(await screen.findByText(/Loading.../i)).toBeInTheDocument()
  
//   await waitFor(() => expect(getByText(/Add to favorites/i)));

// })

describe("Home page render", () => {
  it('should show a loading spinner', async () => {
    let {queryByText} = render(<Home />)
    expect(await screen.findByText(/Loading\.\.\./i)).toHaveTextContent(/loading/i)
    await waitFor(() => expect(queryByText(/Add to favorites/i)).not.toBeNull(), {timeout: 2000})
    await fireEvent.click(screen.queryByText('Add to favorites'))

      expect(screen.queryByText('Already added to favorites')).toHaveAttribute("disabled", true)
  })

  // it('Favorite button should be displayed', async () => {
  //   render(<Home />)
  //   expect(await screen.findByText(/Add to Favorites/i)).toBeTruthy()
  // })
})
