import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { fireEvent } from '@testing-library/react';

test('<BlogForm />', async () => {
    const handleForm = jest.fn()
    const title = 'titleeeee'
    const setTitle = jest.fn()
    const author = 'authorrrrrrr'
    const setAuthor = jest.fn()
    const url = 'url.com'
    const setUrl = jest.fn()

    handleForm.mockImplementation(event => {
        event.preventDefault()
    })
    const user = userEvent.setup()

    render(<BlogForm handleForm={handleForm} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />)

    screen.debug()





    const submitBtn = screen.getByText('Create')



    await user.click(submitBtn)

    //since we called the event once
    console.log(handleForm.mock.calls[0][0].content)
    expect(handleForm.mock.calls).toHaveLength(1)

})