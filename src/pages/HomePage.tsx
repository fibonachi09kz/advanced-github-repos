import React, {useEffect, useState} from 'react'
import {useLazyGetUserReposQuery, useSearchUsersQuery} from '../store/github/github.api'
import {useDebounce} from '../hooks/debounce'
import {RepoCard} from '../components/RepoCard'

export function HomePage() {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    })
    const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0)
    }, [debounced, data])

    const clickHandler = (username: string) => {
        fetchRepos(username)
        setDropdown(false)
    }

    return (
        <div className="flex justify-center py-10 mx-auto">
            { isError && <p className="text-center text-red-600">Что-то пошло не так...</p> }

            <div className="relative">
                <div className="max-w-[540px] mx-auto w-full">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Поиск</label>
                    <div className="mt-1">
                        <input type="text" name="email"
                               className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                               placeholder="Search for Github username..."
                               value={search}
                               onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <ul className="my-6 border divide-y divide-gray-200 mx-auto max-w-[540px] max-h-[200px] overflow-y-scroll shadow-md bg-white sm:rounded-md">
                    { isLoading && <p className="text-center py-2 text-medium font-medium text-gray-900">Загрузка...</p> }
                    { !data?.length && <p className="text-center py-2 text-medium font-medium text-gray-900">Результаты отсутствуют</p> }
                    { data?.map(user => (
                        <li
                            key={user.id}
                            onClick={() => clickHandler(user.login)}
                            className="py-4 flex items-center px-4 hover:bg-gray-200 hover:text-white transition-colors cursor-pointer"
                        >
                            <img className="h-10 w-10 rounded-full"
                             src={ user.avatar_url }
                             alt="" />
                            <p className="ml-4 text-sm font-medium text-gray-900">{ user.login }</p>
                        </li>
                    )) }
				</ul>

                <div className="container max-w-screen-lg">
                    { areReposLoading && <p className="text-center">Репозитории загружаются...</p> }
                    <div className="shadow mt-12 overflow-hidden border border-b border-gray-300 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 ">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forks
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Watchers
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                { repos?.map(repo => <RepoCard repo={repo} key={repo.id} />) }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}