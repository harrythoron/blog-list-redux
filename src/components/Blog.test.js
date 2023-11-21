import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container
    let blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 'likes',
        user: {
            name: 'pk'
        }
    }
    let increaseLikes = jest.fn()
    let removeBlogBtn = jest.fn()
    let loggedUser = {
        username: 'pk'
    }

    beforeEach(() => {
        container = render(
            <Blog blog={blog} increaseLikes={increaseLikes} removeBlogBtn={removeBlogBtn} loggedUser={loggedUser} />
        ).container


    })

    test('does not render its URL or number of likes by default', () => {
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display:none')
    })

    test('when show button is clicked, url and likes is shown', async () => {
        const user = userEvent.setup()
        const btn = screen.getByText('show')

        await user.click(btn)

        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display:none')

    })

    test('when show button is clicked, url and likes is shown', async () => {
        const user = userEvent.setup()
        const btn = screen.getByText('show')

        await user.click(btn)

        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display:none')

        //grab the like button
        const likeBtn = screen.getByText('like')
        await user.click(likeBtn)
        await user.click(likeBtn)
        console.log(increaseLikes.mock.calls)
        //since we click the mock btn twice we expect the calls to have twice as well
        expect(increaseLikes.mock.calls).toHaveLength(2)


    })


})