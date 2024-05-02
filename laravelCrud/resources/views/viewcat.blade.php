@include('header')
<div class="container">
<h3 class="text-center">view category</h3>

 <!-- Blank Start -->
 <div class="container-fluid pt-4 px-4">
                <div class="row  bg-light rounded  mx-0">
                    <div class="col-md-11">
                        <h3>Categories Details</h3>
                        <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Categories Id</th>
                                        <th scope="col">Categories Name</th>
                                        <th scope="col">Categories Image</th>
                                        <th scope="col" colspan="2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($object as $key => $values)
                                    <tr>
                                        <th scope="row">{{$values['catId']}}</th>
                                        <td>{{$values['catName']}}</td>
                                        <td><img src="assets/categories/{{$values['catImage']}}" width="90" alt=""></td>
                                        <td><a href="edit/{{$values['catId']}}" class="btn btn-info">Edit</a></td>
                                        <td><a href="delete/{{$values['catId']}}" class="btn btn-danger">Delete</a></td>
                                    </tr>
                                  @endforeach
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
            @if(session('UpdateCat'))
            <script>
                alert("category update successfully");
            </script>
            @elseif(session('deleteCat'))
            <script>
                      alert("category delete successfully");
            </script>
            @endif
            <!-- Blank End -->


</div>
@include('footer')
